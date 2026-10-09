import { useRef } from 'react';
import { cn } from '@/lib/cn';
import { SECTION_ID } from '@/lib/pre-diagnosis/constants';
import type {
  ChoiceQuestion,
  MultiChoiceQuestion,
  Question,
  QuestionId,
  TextQuestion,
} from '@/lib/pre-diagnosis/types';
import type { AnswerHandler } from './usePreDiagnosis';
import styles from './QuestionField.module.scss';

interface FieldProps<Q extends Question, V> {
  readonly question: Q;
  readonly value: V | undefined;
  readonly onChange: (value: V, autoAdvance: boolean) => void;
}

const fieldId = (questionId: QuestionId) => `${SECTION_ID}-${questionId}`;

/** Teclas que marcam um radio (e disparam `click` nele). */
const RADIO_SELECTION_KEYS = new Set([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);

function ChoiceField({ question, value, onChange }: FieldProps<ChoiceQuestion, string>) {
  // Setas e espaço também marcam o radio; só toque/clique avançam sozinhos
  const selectedByKeyboard = useRef(false);

  const handleClick = (optionValue: string) => {
    onChange(optionValue, !selectedByKeyboard.current);
    selectedByKeyboard.current = false;
  };

  return (
    <fieldset className={styles.field}>
      <legend className={styles.label}>{question.label}</legend>
      <div className={styles.options}>
        {question.options.map((option) => {
          const isSelected = option.value === value;

          return (
            <label
              key={option.value}
              className={cn(styles.option, isSelected && styles.optionSelected)}
            >
              <input
                type='radio'
                name={fieldId(question.id)}
                className={styles.control}
                value={option.value}
                checked={isSelected}
                readOnly
                onKeyDown={(event) => {
                  if (RADIO_SELECTION_KEYS.has(event.key)) selectedByKeyboard.current = true;
                }}
                // onClick (e não onChange) para tocar de novo na opção marcada também avançar
                onClick={() => handleClick(option.value)}
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function MultiChoiceField({
  question,
  value = [],
  onChange,
}: FieldProps<MultiChoiceQuestion, readonly string[]>) {
  const toggle = (optionValue: string) => onChange(
    value.includes(optionValue)
      ? value.filter((item) => item !== optionValue)
      : [...value, optionValue],
    false,
  );

  return (
    <fieldset className={styles.field}>
      <legend className={styles.label}>{question.label}</legend>
      <div className={styles.options}>
        {question.options.map((option) => {
          const isChecked = value.includes(option.value);

          return (
            <label
              key={option.value}
              className={cn(styles.option, isChecked && styles.optionSelected)}
            >
              <input
                type='checkbox'
                className={styles.control}
                checked={isChecked}
                onChange={() => toggle(option.value)}
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function TextField({ question, value = '', onChange }: FieldProps<TextQuestion, string>) {
  const inputId = fieldId(question.id);
  const helpId = `${inputId}-help`;

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={styles.label}>{question.label}</label>
      <input
        id={inputId}
        type='text'
        className={styles.input}
        value={value}
        placeholder={question.placeholder}
        autoComplete={question.autoComplete ?? 'off'}
        aria-describedby={question.help ? helpId : undefined}
        required
        onChange={(event) => onChange(event.target.value, false)}
      />
      {question.help && <p id={helpId} className={styles.help}>{question.help}</p>}
    </div>
  );
}

interface QuestionFieldProps {
  readonly question: Question;
  readonly value: string | readonly string[] | undefined;
  readonly onAnswer: AnswerHandler;
}

/** Escolhe o campo certo para o tipo da pergunta. */
export function QuestionField({ question, value, onAnswer }: QuestionFieldProps) {
  const onChange = (answer: string | readonly string[], autoAdvance: boolean) => (
    onAnswer(question.id, answer, autoAdvance)
  );

  switch (question.kind) {
    case 'choice':
      return (
        <ChoiceField
          question={question}
          value={typeof value === 'string' ? value : undefined}
          onChange={onChange}
        />
      );
    case 'multi':
      return (
        <MultiChoiceField
          question={question}
          value={Array.isArray(value) ? value : undefined}
          onChange={onChange}
        />
      );
    case 'text':
      return (
        <TextField
          question={question}
          value={typeof value === 'string' ? value : undefined}
          onChange={onChange}
        />
      );
  }
}
