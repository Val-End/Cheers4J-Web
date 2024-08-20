export type Subscription = {
   data:           Datum[];
   total:          number;
   total_cost:     number;
   max_total_cost: number;
}

export type Datum = {
   id:         string;
   status:     string;
   type:       string;
   version:    string;
   cost:       number;
   condition:  Condition;
   transport:  Transport;
   created_at: Date;
}

export type Condition = {
   broadcaster_user_id: string;
   moderator_user_id:   string;
}

export type Transport = {
   method:   string;
   callback: string;
}
