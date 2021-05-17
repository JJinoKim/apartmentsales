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
    searchName : (apartName :string) => void;
    sortApartList : (sortType : string, sort : string) => void;
    siList : Array<ISiCode> | undefined ;
    sidoList : Array<ISidoCode> | undefined;
    selSidoList : Array<ISidoCode> | undefined;
    ApartList : Array<IApartmentData> | undefined;
}

// 한글이라니...
interface IApartmentData {
    거래금액 : string;
    건축년도 : number;
    년 : number;
    법정동 : string;
    아파트 : string;
    월 : number;
    일 : number;
    전용면적 : number;
    지번 : string,
    층 : number,
    해제사유발생일 : string;
    해제여부 : string    
}
