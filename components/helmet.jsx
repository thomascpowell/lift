// Next
import Head from "next/head";

// Head Component
// Props: Title

const Helmet = ({title}) => {
    return (
        <Head> 
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            <meta name="description" content="Workout tracker webapp"/>
        </Head>
    );
}

export default Helmet;
