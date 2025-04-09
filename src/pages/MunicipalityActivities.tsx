import { useParams } from 'react-router-dom';

const MunicipalityActivities = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Municipality Activities</h1>
      <p>Municipality ID: {id}</p>
      <div className="mt-4">
        <p>This page will display activities for the selected municipality.</p>
      </div>
    </div>
  );
};

export default MunicipalityActivities; 