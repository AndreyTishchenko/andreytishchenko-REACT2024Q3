import IResults from '../../Types/ApiResultsType'

export default interface IPropsType {
    APIresults: IResults
    Rerender: () => void
    ChangeUrl: (page: string) => void
}
