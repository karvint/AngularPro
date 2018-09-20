export const Constant = {
    codeDefault:"-- *********************************************************************\n" +
    "-- 功能：创建demo_ods_complaint_data_d表\n" +
    "-- 作者：明罡(minggang.jmg@dtwave-inc.com)\n" +
    "-- 时间：2018-02-02\n" +
    "-- *********************************************************************\n" +
    "-- drop table if exists demo_ods_complaint_data_d;\n" +
    "create table if not exists demo_ods_complaint_data_d (\n" +
    "    user_id bigint comment '业主ID',\n" +
    "    content string comment '投诉内容',\n" +
    "    complaint_time string comment '投诉时间'\n" +
    ") comment '业主投诉内容表' partitioned by (ds string comment '按天分区,例如20160620') stored as parquet;"
}
