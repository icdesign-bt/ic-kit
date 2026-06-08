import { useEffect, useState } from 'react';
import { Alert, Button, Checkbox, Input } from 'ic-kit';

type Brand = 'ic' | 'codd';
type Theme = 'light' | 'dark';

export function App() {
  const [brand, setBrand] = useState<Brand>('ic');
  const [theme, setTheme] = useState<Theme>('light');
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.brand = brand;
    document.documentElement.dataset.theme = theme;
  }, [brand, theme]);

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: 'var(--spacing-40, 40px) var(--spacing-16, 16px)',
        maxWidth: 480,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-16, 16px)',
      }}
    >
      <h1 style={{ margin: 0, font: 'var(--font-heading-h4)' }}>ic-kit starter</h1>
      <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
        Шаблон из <code>examples/vite-starter</code>. Storybook:{' '}
        <a href="https://icdesign-bt.github.io/ic-kit/">витрина</a>
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button
          variant={brand === 'ic' ? 'contained' : 'outlined'}
          color="primary"
          size="sm"
          onClick={() => setBrand('ic')}
        >
          ИЦ
        </Button>
        <Button
          variant={brand === 'codd' ? 'contained' : 'outlined'}
          color="primary"
          size="sm"
          onClick={() => setBrand('codd')}
        >
          ЦОДД
        </Button>
        <Button
          variant={theme === 'light' ? 'contained' : 'outlined'}
          color="secondary"
          size="sm"
          onClick={() => setTheme('light')}
        >
          Light
        </Button>
        <Button
          variant={theme === 'dark' ? 'contained' : 'outlined'}
          color="secondary"
          size="sm"
          onClick={() => setTheme('dark')}
        >
          Dark
        </Button>
      </div>

      <Input label="Email" placeholder="name@example.com" fullWidth size="lg" />

      <Checkbox
        label="Согласен на обработку данных"
        checked={agreed}
        onChange={(event) => setAgreed(event.target.checked)}
        size="md"
      />

      <Button variant="contained" color="primary" disabled={!agreed}>
        Отправить
      </Button>

      <Alert type="primary" variant="tonal" title="Готово">
        Кит подключён: <code>ic-kit/styles.css</code> + компоненты из пакета.
      </Alert>
    </main>
  );
}
