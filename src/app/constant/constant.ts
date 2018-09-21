export const Constant = {
    sqlDefault:"-- *********************************************************************\n" +
    "-- 功能：创建demo_ods_complaint_data_d表\n" +
    "-- 作者：明罡(minggang.jmg@dtwave-inc.com)\n" +
    "-- 时间：2018-02-02\n" +
    "-- *********************************************************************\n" +
    "-- drop table if exists demo_ods_complaint_data_d;\n" +
    "create table if not exists demo_ods_complaint_data_d (\n" +
    "    user_id bigint comment '业主ID',\n" +
    "    content string comment '投诉内容',\n" +
    "    complaint_time string comment '投诉时间'\n" +
    ") comment '业主投诉内容表' partitioned by (ds string comment '按天分区,例如20160620') stored as parquet;",
  javaDefault:"public class Main {\n" +
  "\n" +
  "    public static void main(String[] args) {\n" +
  "        System.out.println(\"Hello world!\");\n" +
  "    }\n" +
  "}",
  pythonDefault:"print(\"Hello world!\")  #向屏幕输出Hello world!",
  scalaDefault:"$ scala\n" +
  "Welcome to Scala version 2.11.7 (Java HotSpot(TM) 64-Bit Server VM, Java 1.8.0_31).\n" +
  "Type in expressions to have them evaluated.\n" +
  "Type :help for more information.\n" +
  "\n" +
  "scala> 1 + 1\n" +
  "res0: Int = 2\n" +
  "\n" +
  "scala> println(\"Hello World!\")\n" +
  "Hello World!\n" +
  "\n" +
  "scala> "
}
