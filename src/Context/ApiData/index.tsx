import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

import Sidata from '~/Assets/Data/siData.json';
import SidoData from '~/Assets/Data/sidoData.json';


const defaultContext : IApiData = {
    getSi : () => {},
    getSido : (si_code : string) => {},
    getApiData : async (lawd_cd : string, deal_ymd : string) => {},
    siList : undefined,
    sidoList : undefined,
    selSidoList : undefined,
}

const ServiceKey = 'ftuC8hlsPStymsmzxO8tavBIgc3en%2FvZpvfB3e6M9M0Z9fIYXmWHzWfVhNnDCsq0ia%2BqvIHY%2FYClFwh8mbXvqg%3D%3D';
const http = 'http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade';

const ApiContext =createContext(defaultContext);

interface Props {
    children: JSX.Element | Array<JSX.Element>;
}


const ApiContextProvider = ({children} : Props) => {
    const [siList , setSiList] = useState<Array<ISiCode>>([]);
    const [sidoList , setSidoList] = useState<Array<ISidoCode>>([]);
    const [selSidoList, setSelSidoList] = useState<Array<ISidoCode>>([]);

    const getSido = (si_code : string) => {  
        const tempSidoList =sidoList.filter((e) => e.sido_code.substr(0,2) === si_code);
        setSelSidoList(tempSidoList);
    }

    const getSi = () => {
        setSiList(Sidata);
        setSidoList(SidoData);
    }

    const getApiData = async (lawd_cd : string, deal_ymd : string) => {     
        const apiUrl = `${http}?serviceKey=${ServiceKey}&LAWD_CD=${lawd_cd}&DEAL_YMD=${deal_ymd}`;
        axios.get(apiUrl).then((res) => {
            console.log(res);
        })
        
    }

    useEffect(() => {
        console.log('context useEffect');
        getSi();                
    },[])

    return (
       <ApiContext.Provider
        value={{
            getSido,
            siList,
            getSi,
            sidoList,
            selSidoList,
            getApiData
        }}
       >
           {children}
       </ApiContext.Provider>
    );
};

export  { ApiContextProvider, ApiContext};