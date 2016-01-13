--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: chkpass; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS chkpass WITH SCHEMA public;


--
-- Name: EXTENSION chkpass; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION chkpass IS 'data type for auto-encrypted passwords';


SET search_path = public, pg_catalog;

--
-- Name: transaction_method; Type: TYPE; Schema: public; Owner: moneybook
--

CREATE TYPE transaction_method AS ENUM (
    'income',
    'expense'
);


ALTER TYPE transaction_method OWNER TO moneybook;

--
-- Name: id_generator(); Type: FUNCTION; Schema: public; Owner: moneybook
--

CREATE FUNCTION id_generator(OUT result bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
DECLARE
    our_epoch bigint := 1314220021721;
    seq_id bigint;
    now_millis bigint;
    -- the id of this DB shard, must be set for each
    -- schema shard you have - you could pass this as a parameter too
    shard_id int := 1;
BEGIN
    SELECT nextval('global_id_sequence') % 1024 INTO seq_id;

SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis;
    result := (now_millis - our_epoch) << 23;
    result := result | (shard_id << 10);
    result := result | (seq_id);
END;
$$;


ALTER FUNCTION public.id_generator(OUT result bigint) OWNER TO moneybook;

--
-- Name: global_id_sequence; Type: SEQUENCE; Schema: public; Owner: moneybook
--

CREATE SEQUENCE global_id_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE global_id_sequence OWNER TO moneybook;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: transactions; Type: TABLE; Schema: public; Owner: moneybook; Tablespace: 
--

CREATE TABLE transactions (
    id bigint DEFAULT id_generator() NOT NULL,
    note text,
    amount integer DEFAULT 0 NOT NULL,
    tags text[],
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE transactions OWNER TO moneybook;

--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: moneybook
--

CREATE SEQUENCE transactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE transactions_id_seq OWNER TO moneybook;

--
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: moneybook
--

ALTER SEQUENCE transactions_id_seq OWNED BY transactions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: moneybook; Tablespace: 
--

CREATE TABLE users (
    id bigint DEFAULT id_generator() NOT NULL,
    email character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    pwd chkpass
);


ALTER TABLE users OWNER TO moneybook;

--
-- Name: global_id_sequence; Type: SEQUENCE SET; Schema: public; Owner: moneybook
--

SELECT pg_catalog.setval('global_id_sequence', 58, true);


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: moneybook
--

COPY transactions (id, note, amount, tags, created_at, user_id) FROM stdin;
1161370426757088309	test	20000	\N	2016-01-13 15:22:45.19	1156905277748937780
1161370793448309814	test	20000	\N	2016-01-13 15:23:28.913	115690527774893778
1161370804605158455	test	20000	\N	2016-01-13 15:23:30.243	115690527774893778
1161370811483817016	test	20000	\N	2016-01-13 15:23:31.063	115690527774893778
\.


--
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: moneybook
--

SELECT pg_catalog.setval('transactions_id_seq', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: moneybook
--

COPY users (id, email, created_at, pwd) FROM stdin;
1161438208949486650	allstars@gmail.com	2016-01-13 17:37:25.466	:qB1g2WLF7hZW.
\.


--
-- Name: transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: moneybook; Tablespace: 
--

ALTER TABLE ONLY transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: users_email_key; Type: CONSTRAINT; Schema: public; Owner: moneybook; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: moneybook; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

