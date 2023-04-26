import { MatrixProvider } from 'src/components/Context/Provider';
import Matrix from 'src/components/Matrix/Matrix';
import GlobalStyle from 'src/GlobalStyle';

const App: React.FC = () => {
  return (
    <MatrixProvider>
      <GlobalStyle />
      <Matrix />
    </MatrixProvider>
  );
};

export default App;
