import React, { useEffect, useState } from "react";
import { listEmployees } from "../services/EmployeeService";
import { jsonToCSV } from "../services/utils";

const ChatAI = () => {
  const [csv, setCsv] = useState("");

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        const employees = response.data;
        console.log(response.data);

        const csvData = jsonToCSV(employees);
        console.log(csvData);
        setCsv(csvData);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <p>{csv}</p>
    </div>
  );
};

export default ChatAI;