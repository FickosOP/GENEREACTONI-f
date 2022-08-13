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

    function deleteModel(id){
        // console.log(id);
        // let confirm = confirm("Are you sure you want to delete this project? Operation cannot be undone!");
        // if(confirm)
        //     console.log('Delete');//send axios request
        console.log(`send axios delete with id : ${id}`)
    }

    return(
        <div>
            <Header />
            <div className="usersModels">
                {
                    models.map((model) => {
                        return <div key={model._id} className="modelCard" onDoubleClick={() => handleOpenProject(model)} style={{position: 'relative'}}>
                                {model.name}
                                <button className="deleteProjectButton" onClick={() => deleteModel(model._id)}>Delete</button>
                            </div>
                    })
                }
            </div>
        </div>
    )

}

export default Projects;