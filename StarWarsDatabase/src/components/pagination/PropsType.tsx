import IResults from '../../Types/ApiResultsType'

export default interface IPropsType {
    APIresults: IResults | null
    Rerender: () => void
    ChangeUrl: (page: string) => void
}
