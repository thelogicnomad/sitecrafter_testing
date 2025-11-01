import { useParams } from 'react-router-dom';

    const CourseDetailPage = () => {
      const { courseId } = useParams();
      return (
        <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-center">Course Detail: {courseId}</h1>
          <p className="text-center">Detailed information about a specific course.</p>
        </div>
      );
    };
    export default CourseDetailPage;