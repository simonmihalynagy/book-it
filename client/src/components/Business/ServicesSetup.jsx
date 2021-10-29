import axios from "axios";
import React, { useEffect, useState } from "react";
import AddNewService from "./AddNewService";
import EditService from "./EditService";

export default function ServicesSetup(props) {
  const [singleService, setSingleService] = useState({});
  const [services, setServices] = useState([]);
  const [isEditService, setIsEditService] = useState(false);

  useEffect(() => {
    axios.get(`/business/get-services/${props.user._id}`).then((response) => {
      setServices(response.data.foundServices);
    });
  }, [setServices]);

  const editClickHandler = (service) => {
    setIsEditService(!isEditService);
    setSingleService(service);
  };

  const deleteClickHandler = (serviceId) => {
    axios.delete(`/business/delete-service/${serviceId}`).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div>
      <div className="flex flex-row ">
        <div className="flex flex-col items-center  w-2/4">
          <h1>Services</h1>
          {services.map((service) => (
            <div key={service._id}>
              <h3 className="text-red-800">{service.name}</h3>
              <button
                className="rounded border-2 border-black bg-purple-600 text-white"
                onClick={() => editClickHandler(service)}
              >
                Edit service
              </button>
              <button
                className="rounded border-2 border-black bg-purple-600 text-white"
                onClick={() => deleteClickHandler(service._id)}
              >
                Delete this service
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-row  justify-center  w-2/4">
          {isEditService ? (
            <EditService
              singleService={singleService}
              onSaveChangesClick={editClickHandler}
            />
          ) : (
            <AddNewService user={props.user} />
          )}
        </div>
      </div>
      <button
        className="rounded border-2 border-black bg-purple-600 text-white"
        onClick={props.onBackToMainClick}
      >
        Back to DashBoard
      </button>
    </div>
  );
}
