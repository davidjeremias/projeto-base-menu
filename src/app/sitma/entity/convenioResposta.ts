import { ConvenioDTO } from "./convenioDTO";
import { canalDTO } from "./canalDTO";

export class ConvenioResposta {
    public convenio: ConvenioDTO;
    public listaCanalDTO: Array<canalDTO>;
    public numeroFloat: number;
}