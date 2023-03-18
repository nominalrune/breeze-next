import { type } from 'os';

export type OmitSome<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type OmitMany<T, K extends (keyof T)[]> = Omit<T, K[number]>;

export type OneToNine=1|2|3|4|5|6|7|8|9;
export type digit=0|OneToNine;

// type Month="01"|"02"|"03"|"04"|"05"|"06"|"07"|"08"|"09"|"10"|"11"|"12";
// type Day="01"|"02"|"03"|"04"|"05"|"06"|"07"|"08"|"09"|"10"|"11"|"12"|"13"|"14"|"15"|"16"|"17"|"18"|"19"|"20"|"21"|"22"|"23"|"24"|"25"|"26"|"27"|"28"|"29"|"30"|"31";
// type Hours="01"|"02"|"03"|"04"|"05"|"06"|"07"|"08"|"09"|"10"|"11"|"12"|"13"|"14"|"15"|"16"|"17"|"18"|"19"|"20"|"21"|"22"|"23"|"24";


// export type ISODate=`${number}-${Month}-${Day}T${Hours}:${number}:${number}.${number}Z`;
