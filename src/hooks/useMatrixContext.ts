import { useContext } from 'react';

import { MatrixContext } from 'src/components/Context/Context';

const useMatrixContext = () => {
  const context = useContext(MatrixContext);

  if (!context) {
    throw new Error('useMatrixContext must be used within a MatrixProvider');
  }

  return context;
};

export default useMatrixContext;
