-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.4.12-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- iplat 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `iplat` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `iplat`;

-- 테이블 iplat.archive 구조 내보내기
CREATE TABLE IF NOT EXISTS `archive` (
  `no` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `writer` varchar(30) DEFAULT NULL,
  `writer_token` varchar(16) DEFAULT NULL,
  `uploaded_file` varchar(1000) DEFAULT NULL,
  `registered_date` varchar(50) DEFAULT NULL,
  KEY `no` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 iplat.data_logging 구조 내보내기
CREATE TABLE IF NOT EXISTS `data_logging` (
  `start_time` varchar(16) NOT NULL,
  `device_id` varchar(4) NOT NULL,
  `sensor_id` varchar(4) NOT NULL,
  `end_time` varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 iplat.device 구조 내보내기
CREATE TABLE IF NOT EXISTS `device` (
  `user_token` varchar(8) NOT NULL DEFAULT '',
  `device_id` varchar(4) NOT NULL DEFAULT '',
  `device_name` varchar(30) NOT NULL DEFAULT '0' COMMENT '0:ARDUINO / 1: RBPI / 2:SBOX',
  `device_type` varchar(15) NOT NULL DEFAULT '0',
  `protocol_type` varchar(15) NOT NULL DEFAULT '0' COMMENT '0: TCP/IP / 1: HTTP / 2:MQTT',
  `regist_date` varchar(30) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 iplat.free_board 구조 내보내기
CREATE TABLE IF NOT EXISTS `free_board` (
  `no` int(1) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `writer` varchar(30) DEFAULT NULL,
  `writer_token` varchar(8) DEFAULT NULL,
  `uploaded_file` varchar(1000) DEFAULT NULL,
  `registered_date` varchar(50) DEFAULT NULL,
  KEY `no` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COMMENT='자유 게시판';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 iplat.notice_board 구조 내보내기
CREATE TABLE IF NOT EXISTS `notice_board` (
  `no` int(1) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `writer` varchar(30) DEFAULT NULL,
  `writer_token` varchar(8) DEFAULT NULL,
  `uploaded_file` varchar(1000) DEFAULT NULL,
  `registered_date` varchar(50) DEFAULT NULL,
  KEY `no` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COMMENT='공지사항';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 iplat.sensing_data 구조 내보내기
CREATE TABLE IF NOT EXISTS `sensing_data` (
  `user_token` varchar(16) NOT NULL,
  `device_id` varchar(8) NOT NULL,
  `sensor_id` varchar(8) NOT NULL,
  `start_time` varchar(16) NOT NULL,
  `end_time` varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 iplat.sensor 구조 내보내기
CREATE TABLE IF NOT EXISTS `sensor` (
  `user_token` varchar(8) NOT NULL,
  `device_id` varchar(4) NOT NULL DEFAULT '',
  `sensor_id` varchar(4) NOT NULL DEFAULT '',
  `sensor_name` varchar(30) NOT NULL,
  `sensor_type` varchar(30) NOT NULL DEFAULT '',
  `is_alive` binary(1) NOT NULL DEFAULT '0' COMMENT '0 : Not alive, 1 : Alive'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 iplat.stream_server_config 구조 내보내기
CREATE TABLE IF NOT EXISTS `stream_server_config` (
  `device_id` varchar(4) DEFAULT NULL,
  `sensor_id` varchar(4) DEFAULT NULL,
  `ip` varchar(13) DEFAULT NULL,
  `port` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 iplat.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `user_token` varchar(8) DEFAULT NULL,
  `user_id` varchar(15) NOT NULL,
  `user_pw` varchar(64) NOT NULL,
  `email` varchar(30) NOT NULL,
  `is_manager` binary(1) NOT NULL DEFAULT '0' COMMENT '0: not manager / 1: manager'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
