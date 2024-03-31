import { useEffect } from "react";
import { usePageName } from "../../utils/commonFunctions";
import {
  Autocomplete,
  AutocompleteItem,
  Card,
  CardBody,
} from "@nextui-org/react";
import userLogo from "../../assets/images/man.png";
import "./people.css";
import { icon } from "../../UI-Components/Icons/Icons";

const People = () => {
  useEffect(() => {
    usePageName("People");
  }, []);

  const animals = [
    { label: "Cat", value: "cat" },
    { label: "Dog", value: "dog" },
    { label: "Elephant", value: "elephant" },
    { label: "Lion", value: "lion" },
    { label: "Tiger", value: "tiger" },
    { label: "Giraffe", value: "giraffe" },
  ];

  return (
    <div className="people">
      <div className="search">
        <Autocomplete label="Search People" className="autoComplete">
        {animals.map((animal) => (
          <AutocompleteItem key={animal.value} value={animal.value}>
            {animal.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      </div>
      
      <div className="body">
        <h1>
          Filter <i className={icon.filter}></i>
        </h1>
        <div className="cards">
          <Card className="card">
            <CardBody className="card-body">
              <img src={userLogo} />
              <div className="user-info">
                <h5>Name: Muhaz Ahmed</h5>
                <h6>Designation: Full Stack Developer</h6>
                <h6>Reporting To: Sovan Jana</h6>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default People;
