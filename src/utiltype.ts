export type OmitSome<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type OmitMany<T, K extends (keyof T)[]> = Omit<T, K[number]>;

export type OneToNine=1|2|3|4|5|6|7|8|9;
export type digit=0|OneToNine;

// type Month="01"|"02"|"03"|"04"|"05"|"06"|"07"|"08"|"09"|"10"|"11"|"12";
// type Day="01"|"02"|"03"|"04"|"05"|"06"|"07"|"08"|"09"|"10"|"11"|"12"|"13"|"14"|"15"|"16"|"17"|"18"|"19"|"20"|"21"|"22"|"23"|"24"|"25"|"26"|"27"|"28"|"29"|"30"|"31";
// type Hours="01"|"02"|"03"|"04"|"05"|"06"|"07"|"08"|"09"|"10"|"11"|"12"|"13"|"14"|"15"|"16"|"17"|"18"|"19"|"20"|"21"|"22"|"23"|"24";


// export type ISODate=`${number}-${Month}-${Day}T${Hours}:${number}:${number}.${number}Z`;

// export type Tuple<T,N extends number=number> =N extends 1 ? [T] : N extends 2 ? [T, T] : N extends 3 ? [T, T, T] : N extends 4 ? [T, T, T, T] : N extends 5 ? [T, T, T, T, T] : N extends 6 ? [T, T, T, T, T, T] : N extends 7 ? [T, T, T, T, T, T, T] : N extends 8 ? [T, T, T, T, T, T, T, T] : N extends 9 ? [T, T, T, T, T, T, T, T, T] : never;

export type Unit="px"|"%"|"em"|"rem"|"vh"|"vw"|"vmin"|"vmax"|"ch"|"ex"|"cm"|"mm"|"in"|"pt"|"pc"|"deg"|"grad"|"rad"|"turn"|"s";
export type TailwindLength="0"|"0.5"|"1"|"1.5"|"2"|"2.5"|"3"|"3.5"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"14"|"16"|"20"|"24"|"28"|"32"|"36"|"40"|"44"|"48"|"52"|"56"|"60"|"64"|"72"|"80"|"96"
|"1/2"| "1/3"|"2/3"|"1/4"|"2/4"|"3/4"
|"full"|"auto"|"px"|"max"|"min-content"|"max-content"
|"-0"|"-0.5"|"-1"|"-1.5"|"-2"|"-2.5"|"-3"|"-3.5"|"-4"|"-5"|"-6"|"-7"|"-8"|"-9"|"-10"|"-11"|"-12"|"-14"|"-16"|"-20"|"-24"|"-28"|"-32"|"-36"|"-40"|"-44"|"-48"|"-52"|"-56"|"-60"|"-64"|"-72"|"-80"|"-96"
|"-px"
|`[${number}${Unit}]`;

