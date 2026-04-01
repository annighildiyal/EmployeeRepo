import "./App.css";
import EmployeeComponent from "./component/employee/EmployeeComponent";
import FooterComponent from "./component/employee/FooterComponent";
import HeaderComponent from "./component/employee/HeaderComponent";
import ListEmpComponent from "./component/employee/ListEmpComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />

        <Routes>
          <Route path="/" element={<ListEmpComponent />} />
          <Route path="/employees" element={<ListEmpComponent />} />
          <Route path="/add-employee" element={<EmployeeComponent />} />
          <Route path="/edit-employee/:id" element={<EmployeeComponent />} />
          <Route path="/delete-employee/:id" element={<EmployeeComponent />} />
          
          
        </Routes>

        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
