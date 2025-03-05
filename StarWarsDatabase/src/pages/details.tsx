import Layout from '../components/Layout/Layout'
import Main from '../components/main/Main'
import DetailsComponent from '../components/DetailsComponent/DetailsComponent'
import useSearchQuery from '../hooks/myCustomHook'

export default function DetailsPage(): JSX.Element {
    const SearchText = useSearchQuery('SearchText', '')[0]

    return (
        <Layout>
            <Main SearchText={SearchText}>
                <DetailsComponent />
            </Main>
        </Layout>
    )
}
