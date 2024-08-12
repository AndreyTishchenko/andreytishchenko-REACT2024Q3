import IResults from '../../Types/ApiResultsType'

export default interface IPropsType {
    APIresults: IResults | null
    ChangeUrl: (page: string) => void
}
