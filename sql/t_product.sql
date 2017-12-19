/*
Navicat PGSQL Data Transfer

Source Server         : postgre
Source Server Version : 100100
Source Host           : localhost:5432
Source Database       : postgres
Source Schema         : public

Target Server Type    : PGSQL
Target Server Version : 100100
File Encoding         : 65001

Date: 2017-12-17 19:03:17
*/


-- ----------------------------
-- Table structure for t_product
-- ----------------------------
DROP TABLE IF EXISTS "public"."t_product";
CREATE TABLE "public"."t_product" (
"id" int4 DEFAULT nextval('t_product_id_seq'::regclass) NOT NULL,
"name" varchar(100) COLLATE "default" NOT NULL,
"description" text COLLATE "default",
"price" numeric(10,2)
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of t_product
-- ----------------------------
INSERT INTO "public"."t_product" VALUES ('1', 'fsaf', 'fsdfs', '2.00');
INSERT INTO "public"."t_product" VALUES ('2', 'fs', 'sfsf', '1.00');
INSERT INTO "public"."t_product" VALUES ('3', 'fsdf', 'fsdfsdfsdf', '1.00');
INSERT INTO "public"."t_product" VALUES ('4', 'fsfsdf', null, null);

-- ----------------------------
-- Alter Sequences Owned By 
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table t_product
-- ----------------------------
ALTER TABLE "public"."t_product" ADD PRIMARY KEY ("id");
