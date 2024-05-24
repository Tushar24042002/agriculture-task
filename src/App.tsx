import React, { useState } from "react";
import { Button } from "@mantine/core";
import "./App.css";
import YieldAnalytics from "./screens/analytics/YieldAnalytics";
import YearAnalytics from "./screens/analytics/YearAnalytics";

const App: React.FC = () => {
  const [isFirst, setIsFirst] = useState(true);

  return (
    <div className="container">
      <div className="buttonPosition">
        <Button onClick={() => setIsFirst(!isFirst)}>
          Analytics Table {isFirst ? 2 : 1}
        </Button>
      </div>
      {isFirst ? <YearAnalytics /> : <YieldAnalytics />}
    </div>
  );
};

export default App;
