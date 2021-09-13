import Head from "next/head"

const Header = (props) => {
    return (
        <>
            <Head>
                <title>Binar Sparepart Item</title>
            </Head>
            <div className="row">
                <div className="col-12 d-flex justify-content-center text-center"> 
                    <p className="mt-5 h2"> BINAR ACADEMY</p>
                </div>
                <div className="col-12 d-flex justify-content-center text-center"> 
                    <p className="mt-3 h2 f16"> Pengelolaan Data Sparepart Mobil</p>
                </div>
            </div>
        </>
    )
}

export default Header;