import "./Dashboard.css"; // Include the CSS for styling

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>
      <div className="stats">
        <div className="stat-box arrivals">
          <h2>Arrivals</h2>
          <p>This Week</p>
          <h1>0</h1>
        </div>
        <div className="stat-box departures">
          <h2>Departures</h2>
          <p>This Week</p>
          <h1>0</h1>
        </div>
        <div className="stat-box rooms">
          <h2>Rooms Occupied</h2>
          <h1>0</h1>
          <p>0%</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
