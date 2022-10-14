export const useForm = () => {

    const serialize = (formulario) => {
        const formData = new FormData(formulario);
        const objectData = {};
        for(let [name, value] of formData){
            objectData[name] = value;
        }
        return objectData;
    }

    return serialize;
}