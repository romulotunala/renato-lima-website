export type PlanId = 'presencial' | 'dupla' | 'online' | 'storm';

/** Telas do questionário, na ordem em que podem aparecer. */
export type StepId =
  | 'objetivo'
  | 'modalidade'
  | 'parceiro'
  | 'focoOnline'
  | 'situacao'
  | 'agenda'
  | 'treina'
  | 'dor'
  | 'dificuldade'
  | 'inicio'
  | 'nome';

export type ChoiceQuestionId =
  | 'objetivo'
  | 'modalidade'
  | 'parceiro'
  | 'focoOnline'
  | 'situacao'
  | 'periodo'
  | 'treina'
  | 'dor'
  | 'dificuldade'
  | 'inicio';
export type MultiChoiceQuestionId = 'dorLocal';
export type TextQuestionId = 'regiao' | 'nome';
export type QuestionId = ChoiceQuestionId | MultiChoiceQuestionId | TextQuestionId;

/** Respostas guardam o `value` das opções, nunca o texto exibido. */
export type Answers = Partial<Record<ChoiceQuestionId | TextQuestionId, string>> & {
  readonly dorLocal?: readonly string[];
};

export type AnswerValue = string | readonly string[];

export interface Option<V extends string = string> {
  readonly value: V;
  readonly label: string;
}

interface BaseQuestion {
  readonly label: string;
  /** Quando ausente, a pergunta é sempre exibida. */
  readonly visibleWhen?: (answers: Answers) => boolean;
}

export interface ChoiceQuestion extends BaseQuestion {
  readonly kind: 'choice';
  readonly id: ChoiceQuestionId;
  readonly options: readonly Option[];
}

export interface MultiChoiceQuestion extends BaseQuestion {
  readonly kind: 'multi';
  readonly id: MultiChoiceQuestionId;
  readonly options: readonly Option[];
}

export interface TextQuestion extends BaseQuestion {
  readonly kind: 'text';
  readonly id: TextQuestionId;
  readonly placeholder: string;
  readonly help?: string;
  readonly autoComplete?: string;
}

export type Question = ChoiceQuestion | MultiChoiceQuestion | TextQuestion;

export interface Step {
  readonly questions: readonly Question[];
}
