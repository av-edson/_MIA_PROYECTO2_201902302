 SET serveroutput ON;
INSERT INTO USUARIO_TRIGGER VALUES('pp.5','pedro','pablo','81dc9bdb52d04dc20036dbd8313ed055','asdf',TO_DATE('2021-05-10','RR-MM-DD'),2);
INSERT INTO USUARIO_TRIGGER VALUES('elPerro','pedro','pablo','81dc9bdb52d04dc20036dbd8313ed055','asdf',TO_DATE('2021-05-10','RR-MM-DD'),2);


select * from USUARIO_TRIGGER;
DELETE FROM USUARIO_TRIGGER;
-- PARA VALIDAR FECHA DE NACIMIENTO
CREATE OR REPLACE FUNCTION F_ANOS (p_fecini IN TIMESTAMP) 
RETURN number
IS
v_anos NUMBER := 0;
fecha TIMESTAMP;
BEGIN
 SELECT SYSDATE INTO fecha FROM DUAL;
/* Calcula los años de diferencia */
    v_anos  := (EXTRACT(YEAR FROM fecha)  - EXTRACT(YEAR FROM p_fecini));
    IF v_anos > 18 THEN
        RETURN 1;
    ELSE 
        RETURN 0;
    END IF;
END F_ANOS;

SELECT F_ANOS(TO_DATE('24-1-2000','DD-MM-YYYY')) from dual;


-- PARA VALIDAR PASS
CREATE OR REPLACE FUNCTION contra(pass IN VARCHAR)
RETURN NUMBER IS
    tamano NUMBER := 0;
    BEGIN
        SELECT COUNT(Pass) into tamano FROM (Select pass Pass From Dual) 
        WHERE REGEXP_LIKE(Pass, '^.*[0-9]')
        AND REGEXP_LIKE(Pass, '^[a-zA-Z][a-zA-Z0-9]{8,}$');
        IF tamano > 0 THEN
            tamano:= 1;
        ELSE 
            tamano:= 0;
        END IF;
    RETURN tamano;
END contra;

SELECT contra('sdf4e6erS') from dual;

-- PARA VALIDAR CORREO
CREATE OR REPLACE FUNCTION mail(co IN VARCHAR) 
RETURN NUMBER IS
    leido NUMBER:=0;
    BEGIN
        Select COUNT(Correo) into leido
        From (Select Co Correo From Dual)
        Where Regexp_Like(Correo,'\s*\w+([-+.»]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*\s*');
        
         DBMS_OUTPUT.put (leido);
        RETURN leido;
END mail;

select mail('nombre@dominio.com') FROM DUAL;


CREATE OR REPLACE FUNCTION validar(us in varchar,pa in varchar,co in varchar,fe in timestamp)
RETURN NUMBER IS
    pasoUs NUMBER:=0;
    pasoPass NUMBER:=0;
    pasoMail NUMBER:=0;
    pasoDate NUMBER:=0;
    BEGIN
        SELECT F_ANOS(fe) into pasoDate from dual;
        select contra(pa) into pasoPass from dual;
        select mail(co) into pasoMail from dual;
        select count(username) into pasoUs from USUARIO_TRIGGER WHERE username=us;
        if pasodate=1 and pasomail=1 and pasopass=1 and pasous=0 then
            return 1;
        else 
            return 0;
        end if;
END validar;

select validar('av.edson','sdfjew3erS','nombre@dominio.com',TO_DATE('24-1-2000','DD-MM-YYYY')) from dual;
select * from USUARIO_TRIGGER;


CREATE OR REPLACE TRIGGER INGRESOUSUARIO
BEFORE INSERT ON USUARIO_TRIGGER FOR EACH ROW
    DECLARE
    validaciones NUMBER:=0;
    BEGIN
       select validar(:NEW.username,:NEW.pass,:NEW.correo,:NEW.fecha) into validaciones from dual;
        if validaciones=0 then
            raise_application_error(-20000, 'Out of stock'); 
        end if;
END INGRESOUSUARIO;

SELECT * FROM USUARIO_TRIGGER;
DELETE FROM USUARIO_TRIGGER;

INSERT INTO USUARIO_TRIGGER VALUES('pp.5','pedro','pablo','sdafdf4SDSS','nombre@dominio.com',TO_DATE('2000-05-10','RR-MM-DD'),2);
    
    