import React, { useEffect } from "react";
import { listEmployees } from "../services/EmployeeService";
import { parse } from "json2csv";

const ChatAI = () => {
  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        const employees = response.data;
        console.log(response.data);

        const csv = parse(employees);
        console.log(csv);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return <div></div>;
};

export default ChatAI;
