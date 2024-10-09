import QuoteGenerator from '../components/QuoteGenerator';

export default function Home() {
  return (
    <main style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      backgroundColor: '#f0f0f0'
    }}>
      <QuoteGenerator />
    </main>
  );
}
