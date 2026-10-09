import { sendGAEvent } from '@next/third-parties/google';
import { act, render, screen } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PreDiagnosis } from './PreDiagnosis';
import { STEP_SETTLE_MS } from './usePreDiagnosis';

/** Espera o bloqueio contra toque duplo liberar as opções da nova tela. */
async function settle() {
  await act(() => vi.advanceTimersByTime(STEP_SETTLE_MS));
}

async function choose(user: UserEvent, ...labels: string[]) {
  for (const label of labels) {
    await user.click(screen.getByRole('radio', { name: label }));
    await settle();
  }
}

async function clickButton(user: UserEvent, name: string) {
  await user.click(screen.getByRole('button', { name }));
  await settle();
}

vi.mock('@next/third-parties/google', () => ({ sendGAEvent: vi.fn() }));

describe('PreDiagnosis', () => {
  let user: UserEvent;

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
    vi.mocked(sendGAEvent).mockClear();
  });

  it('advances on tap and recalculates the step counter when the modality changes', async () => {
    render(<PreDiagnosis />);

    expect(screen.getByText('Etapa 1 de 7')).toBeInTheDocument();
    await choose(user, 'Hipertrofia');
    expect(screen.getByText('Etapa 2 de 7')).toBeInTheDocument();

    await choose(user, 'Personal em Dupla');
    expect(screen.getByText('Etapa 3 de 9')).toBeInTheDocument();
    expect(screen.getByText('Você já tem alguém para treinar com você?')).toBeInTheDocument();

    await clickButton(user, 'Voltar');
    expect(screen.getByRole('radio', { name: 'Personal em Dupla' })).toBeChecked();
  });

  it('ignores a second tap while the next step is settling', async () => {
    render(<PreDiagnosis />);

    await user.click(screen.getByRole('radio', { name: 'Hipertrofia' }));
    // Mesmo ponto da tela, já na tela 2: o toque duplo não pode responder a modalidade
    await user.click(screen.getByRole('radio', { name: 'Personal Presencial Individual' }));

    expect(screen.getByText('Etapa 2 de 7')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Personal Presencial Individual' })).not.toBeChecked();
  });

  it('selects with the keyboard without advancing until "Continuar"', async () => {
    render(<PreDiagnosis />);

    await user.tab();
    await user.keyboard(' ');
    expect(screen.getByRole('radio', { name: 'Emagrecimento' })).toBeChecked();
    expect(screen.getByText('Etapa 1 de 7')).toBeInTheDocument();

    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('radio', { name: 'Hipertrofia' })).toBeChecked();
    expect(screen.getByText('Etapa 1 de 7')).toBeInTheDocument();

    await clickButton(user, 'Continuar');
    expect(screen.getByText('Etapa 2 de 7')).toBeInTheDocument();
  });

  it('enables "Continuar" only after the required fields are filled', async () => {
    render(<PreDiagnosis />);

    await choose(user, 'Hipertrofia', 'Personal Presencial Individual');
    const continueButton = screen.getByRole('button', { name: 'Continuar' });
    expect(continueButton).toBeDisabled();

    await user.type(screen.getByLabelText('Em qual bairro ou região pretende treinar?'), 'Recreio');
    expect(continueButton).toBeDisabled();

    await choose(user, 'Noite');
    expect(continueButton).toBeEnabled();
  });

  it('asks for the name on its own step before the result', async () => {
    render(<PreDiagnosis />);

    await choose(
      user,
      'Hipertrofia',
      'Online',
      'Acompanhamento contínuo, com feedbacks e ajustes',
      'Sim, regularmente',
      'Não',
      'Outra',
      'Estou apenas pesquisando',
    );

    expect(screen.getByText('Etapa 8 de 8')).toBeInTheDocument();
    const continueButton = screen.getByRole('button', { name: 'Continuar' });
    expect(continueButton).toBeDisabled();

    await user.type(screen.getByLabelText('Qual é seu primeiro nome?'), 'Ana');
    expect(continueButton).toBeEnabled();
    expect(screen.queryByText('Indicação inicial')).not.toBeInTheDocument();
  });

  it('builds the WhatsApp link with the answers on the result step', async () => {
    render(<PreDiagnosis />);

    await choose(
      user,
      'Emagrecimento',
      'Online',
      'Um planejamento de 4 semanas, com mais autonomia',
      'Nunca treinei',
      'Sim',
    );
    await user.click(screen.getByRole('checkbox', { name: 'Coluna' }));
    await clickButton(user, 'Continuar');
    await choose(user, 'Falta de tempo', 'O quanto antes');
    await user.type(screen.getByLabelText('Qual é seu primeiro nome?'), 'Ana{Enter}');

    expect(screen.getByRole('heading', { name: 'Storm Evolution' })).toBeInTheDocument();
    expect(screen.queryByLabelText('Qual é seu primeiro nome?')).not.toBeInTheDocument();
    expect(screen.getByText(/^Ana, pelo que você respondeu/)).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'Conversar com Renato no WhatsApp' });
    const message = new URL(link.getAttribute('href') ?? '').searchParams.get('text');
    expect(message).toContain('*Meu nome*: Ana');
    expect(message).toContain('*Interesse indicado*: Storm Evolution');
    expect(message).toContain('*Dor ou limitação*: Coluna');
    expect(link).toHaveAttribute('data-whatsapp-origin', 'pre-diagnostico');
  });

  it('tracks the recommended plan when the result step is reached', async () => {
    vi.stubEnv('NEXT_PUBLIC_GA_ID', 'G-TEST');
    render(<PreDiagnosis />);

    await choose(user, 'Hipertrofia', 'Personal Presencial Individual');
    await user.type(screen.getByLabelText('Em qual bairro ou região pretende treinar?'), 'Barra');
    await choose(user, 'Manhã');
    await clickButton(user, 'Continuar');
    await choose(user, 'Às vezes', 'Não', 'Alimentação', 'Nas próximas semanas');
    await user.type(screen.getByLabelText('Qual é seu primeiro nome?'), 'Bia');
    expect(sendGAEvent).not.toHaveBeenCalled();

    await clickButton(user, 'Continuar');

    expect(sendGAEvent).toHaveBeenCalledOnce();
    expect(sendGAEvent).toHaveBeenCalledWith(
      'event',
      'pre_diagnostico_resultado',
      { plano: 'presencial' },
    );
  });

  it('goes back to the first step keeping the answers on "Revisar respostas"', async () => {
    render(<PreDiagnosis />);

    await choose(user, 'Hipertrofia', 'Personal Presencial Individual');
    await user.type(screen.getByLabelText('Em qual bairro ou região pretende treinar?'), 'Barra');
    await choose(user, 'Manhã');
    await clickButton(user, 'Continuar');
    await choose(user, 'Às vezes', 'Não', 'Alimentação', 'Nas próximas semanas');
    await user.type(screen.getByLabelText('Qual é seu primeiro nome?'), 'Bia');
    await clickButton(user, 'Continuar');

    await clickButton(user, 'Revisar respostas');
    expect(screen.getByRole('radio', { name: 'Hipertrofia' })).toBeChecked();

    await choose(user, 'Hipertrofia');
    expect(screen.getByRole('radio', { name: 'Personal Presencial Individual' })).toBeChecked();
  });

  it('clears all answers on "Refazer"', async () => {
    render(<PreDiagnosis />);

    await choose(
      user,
      'Hipertrofia',
      'Online',
      'Acompanhamento contínuo, com feedbacks e ajustes',
      'Sim, regularmente',
      'Não',
      'Outra',
      'Estou apenas pesquisando',
    );
    await user.type(screen.getByLabelText('Qual é seu primeiro nome?'), 'Ana');
    await clickButton(user, 'Continuar');
    await clickButton(user, 'Refazer');

    expect(screen.getByText('Etapa 1 de 7')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Hipertrofia' })).not.toBeChecked();
  });
});
