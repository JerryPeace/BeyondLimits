import Loading from './Loading';
export default function LoaderWrapper({ children, isLoading }: { children: any; isLoading?: boolean }) {
    return <div className="w-full">{isLoading ? <Loading /> : children}</div>;
}
