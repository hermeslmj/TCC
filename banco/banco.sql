SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
CREATE SCHEMA IF NOT EXISTS `tcc` DEFAULT CHARACTER SET latin1 ;
USE `mydb` ;
USE `tcc` ;

-- -----------------------------------------------------
-- Table `tcc`.`areaTexto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tcc`.`areaTexto` ;

CREATE  TABLE IF NOT EXISTS `tcc`.`areaTexto` (
  `id` INT(11) NOT NULL ,
  `largura` INT(11) NULL DEFAULT NULL ,
  `altura` INT(11) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `tcc`.`caixa`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tcc`.`caixa` ;

CREATE  TABLE IF NOT EXISTS `tcc`.`caixa` (
  `id` INT(11) NOT NULL ,
  `multipla` INT(11) NULL DEFAULT NULL ,
  `opcoes` TEXT NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `tcc`.`formulario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tcc`.`formulario` ;

CREATE  TABLE IF NOT EXISTS `tcc`.`formulario` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `nome` VARCHAR(100) NOT NULL ,
  `data_criacao` DATE NOT NULL ,
  `ultimo_envio` DATETIME NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `tcc`.`campo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tcc`.`campo` ;

CREATE  TABLE IF NOT EXISTS `tcc`.`campo` (
  `id` INT(11) NOT NULL ,
  `id_formulario` INT(11) NOT NULL ,
  `nome` VARCHAR(100) NOT NULL ,
  `tipo` VARCHAR(45) NOT NULL COMMENT 'Tipos de campos: Texto, Upload, Lista, Caixa, Area de texto' ,
  `obrigatorio` INT(11) NOT NULL COMMENT '1 - Obrigatório , 0 - Não Obrigatório' ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_campo_1_idx` (`id_formulario` ASC) ,
  CONSTRAINT `id_formulario`
    FOREIGN KEY (`id_formulario` )
    REFERENCES `tcc`.`formulario` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `tcc`.`lista`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tcc`.`lista` ;

CREATE  TABLE IF NOT EXISTS `tcc`.`lista` (
  `id` INT(11) NOT NULL ,
  `opcoes` TEXT NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `tcc`.`texto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tcc`.`texto` ;

CREATE  TABLE IF NOT EXISTS `tcc`.`texto` (
  `id` INT(11) NOT NULL ,
  `tamanho` INT(11) NULL DEFAULT NULL ,
  `validacao` VARCHAR(45) NULL DEFAULT NULL COMMENT 'Tipo de validação. Ainda não foram definidos todos os tipos de validação.' ,
  PRIMARY KEY (`id`) ,
  INDEX `id_idx` (`id` ASC) ,
  CONSTRAINT `id`
    FOREIGN KEY (`id` )
    REFERENCES `tcc`.`campo` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `tcc`.`upload`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tcc`.`upload` ;

CREATE  TABLE IF NOT EXISTS `tcc`.`upload` (
  `id` INT(11) NOT NULL ,
  `caminho` VARCHAR(200) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `id_campo_idx` (`id` ASC) ,
  CONSTRAINT `id_campo`
    FOREIGN KEY (`id` )
    REFERENCES `tcc`.`campo` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
