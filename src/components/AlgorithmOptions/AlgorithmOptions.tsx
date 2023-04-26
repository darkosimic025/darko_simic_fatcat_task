import ButtonGroup from 'src/components/UI/ButtonGroup/ButtonGroup';
import Text from 'src/components/UI/Text/Text';
import useMatrixContext from 'src/hooks/useMatrixContext';

const AlgorithmOptions: React.FC = () => {
  const matrixContext = useMatrixContext();

  const { setSelectedAlgorithm, isRunning } = matrixContext;

  const handleSelectAlgorithmButton = (selectedOption: string) => {
    setSelectedAlgorithm(selectedOption);
  };

  return (
    <>
      <Text fontSize="m">Choose algorithm</Text>
      <ButtonGroup
        disabled={isRunning}
        size="s"
        options={['A*', 'BFS', 'DFS']}
        onButtonClick={handleSelectAlgorithmButton}
      />
    </>
  );
};

export default AlgorithmOptions;
