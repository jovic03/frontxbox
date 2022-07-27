import api from "./api"
import swal from 'sweetalert';

const homepage = {
    homepage: (id: string) =>
      api.get(`/homepage/${id}`)
      .then((response: any) => response)
      .catch((error: any) => {
        swal({
          title: "Erro!",
          text: `${error.message}`,
          icon: "error",
          timer: 7000,
        })
      })
  }


  export {homepage}