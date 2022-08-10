import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadModel } from "../actions/actions";
import Header from "../components/Header";
import { getAllModelsForUser } from "../services/axiosService";

function Projects(){

    const[models, setModels] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getAllModelsForUser((response) => {
            console.log(response.data);
            setModels(response.data);
        })
    }, []);

    function handleOpenProject(model){
        console.log(model._id);
        dispatch(loadModel(model));
        navigate("/", {replace: true});
    }

    return(
        <div>
            <Header />
            <div className="usersModels">
                {
                    models.map((model) => {
                        return <div className="modelCard" onClick={() => handleOpenProject(model)}>
                                model
                            </div>
                    })
                }
            </div>
        </div>
    )

}

export default Projects;