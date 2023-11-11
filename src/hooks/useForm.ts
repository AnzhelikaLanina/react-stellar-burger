import {ChangeEvent, useState} from "react";
import {TUseForm} from "../utils/types";


export const useForm =  <T extends TUseForm>(inputValues: T) => {
    const [values, setValues] = useState(inputValues);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
}
