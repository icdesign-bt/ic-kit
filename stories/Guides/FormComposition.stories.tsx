import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '../../src/components/Alert';
import { Button } from '../../src/components/Button';
import { Checkbox } from '../../src/components/Checkbox';
import { Input } from '../../src/components/TextField';

const meta = {
  title: 'Guides/Form composition',
  parameters: {
    docs: {
      description: {
        component:
          'Пример формы без отдельного Form-wrapper: Label, helper/error и кнопки из примитивов ic-kit. Паттерн подходит для прототипов и продуктовых экранов.',
      },
    },
    layout: 'padded',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

function ContactFormDemo() {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(false);
    if (!email.includes('@')) {
      setError('Укажите корректный email');
      return;
    }
    if (!agreed) {
      setError('Нужно согласие на обработку данных');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-16, 16px)',
        maxWidth: 420,
      }}
    >
      <Input
        label="Email"
        placeholder="name@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={Boolean(error && !email.includes('@'))}
        helperText={error && !email.includes('@') ? error : 'На этот адрес придёт ответ'}
        fullWidth
        size="lg"
      />

      <Checkbox
        label="Согласен на обработку персональных данных"
        checked={agreed}
        onChange={(event) => setAgreed(event.target.checked)}
        size="md"
      />

      {error && (
        <Alert type="error" variant="tonal" title="Проверьте форму">
          {error}
        </Alert>
      )}

      {submitted && (
        <Alert type="success" variant="tonal" title="Отправлено">
          Заявка принята — {email}
        </Alert>
      )}

      <div style={{ display: 'flex', gap: 'var(--spacing-16, 16px)' }}>
        <Button type="submit" variant="contained" color="primary">
          Отправить
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="primary"
          onClick={() => {
            setEmail('');
            setAgreed(false);
            setError(null);
            setSubmitted(false);
          }}
        >
          Сбросить
        </Button>
      </div>
    </form>
  );
}

export const ContactForm: Story = {
  render: () => <ContactFormDemo />,
};
