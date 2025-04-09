import { useParams } from 'react-router-dom';

const ActivityDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Activity Details</h1>
      <p>Activity ID: {id}</p>
      <div className="mt-4">
        <p>This page will display detailed information about the selected activity.</p>
      </div>
    </div>
  );
};

export default ActivityDetails; 