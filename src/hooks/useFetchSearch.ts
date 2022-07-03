import { useInfiniteQuery } from 'react-query';
import Fetch from '@/hooks/fetch';

const useFetchSearch = (props: any) => {
    const fetch = new Fetch(props);

    const fetchList = ({ pageParam = 1 }) => fetch.getSearch({ ...props, page: pageParam });

    return useInfiniteQuery(["search", props], fetchList, { //props is returned data
        getNextPageParam: (props) => {
            return !props.hasNextPage
                ? null
                : Number(props.currentPage) + 1;
        },
    });
};

export default useFetchSearch;