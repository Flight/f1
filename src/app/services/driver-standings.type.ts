export interface Driver {
    driverId: string;
    permanentNumber: string;
    code: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
}

export interface Constructor {
    constructorId: string;
    url: string;
    name: string;
    nationality: string;
}

export interface DriverStanding {
    position: string;
    positionText: string;
    points: string;
    wins: string;
    Driver: Driver;
    Constructors: Constructor[];
}

export interface StandingsList {
    season: string;
    round: string;
    DriverStandings: DriverStanding[];
}

export interface StandingsTable {
    driverStandings: string;
    StandingsLists: StandingsList[];
}

export interface DriverStandingsData {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    StandingsTable: StandingsTable;
}

export interface DriverStandings {
    MRData: DriverStandingsData;
}
