interface ISiCode{
    si_code : string;
    si_name : string;
}

interface ISidoCode{
    sido_code : string;
    sido_name : string;
}

interface IApiData  {
    getSi : () => void;
    getSido : (si_code : string) => void;
    getApiData : (lawd_cd : string, deal_ymd : string) => void;
    siList : Array<ISiCode> | undefined ;
    sidoList : Array<ISidoCode> | undefined;
    selSidoList : Array<ISidoCode> | undefined;
}