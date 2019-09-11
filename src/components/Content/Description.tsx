import React from "react";
import { Row, Col, Button } from "reactstrap";
import { connect } from "react-redux";
import { css } from "emotion";

import { changePokemon } from "../../actions";

interface IDescriptionProps {
  name: string;
  types: string[];
  height: string;
  weight: string;
  abilities: { normal: string[]; hidden: string[] };
  family: {
    id: number;
    evolutionStage: number;
    evolutionLine: { name: string; number: string; sprite: string }[];
  };
  changePokemon: Function;
}

const Description = (props: IDescriptionProps) => {
  const {
    name,
    types,
    height,
    weight,
    abilities,
    family,
    changePokemon
  } = props;

  const renderTypes = () => {
    return (
      <Row className="mb-2 mb-md-3">
        {types.map((type, index) => (
          <Col key={index} className="text-center">
            <Button color={type.toLowerCase()}>{type}</Button>
          </Col>
        ))}
      </Row>
    );
  };

  const renderHeightWeight = () => {
    return (
      <Row className="text-center my-2 my-md-3">
        <Col>
          <h4 className="mb-0 mb-md-3">Height</h4>
          <div
            className={`${css`
              font-size: 2.25rem;
              font-weight: 600;
              line-height: 1.2;

              @media (max-width: 768px) {
                font-size: 1.75rem;
              }
            `} text-white`}
          >
            {height}
          </div>
        </Col>
        <Col>
          <h4 className="mb-0 mb-md-3">Weight</h4>
          <div
            className={`${css`
              font-size: 2.25rem;
              font-weight: 600;
              line-height: 1.2;

              @media (max-width: 768px) {
                font-size: 1.75rem;
              }
            `} text-white`}
          >
            {weight}
          </div>
        </Col>
      </Row>
    );
  };

  const renderAbilities = () => {
    return (
      <>
        <Row className="mt-2 mt-md-3">
          <h4 className="m-auto">Abilities</h4>
        </Row>
        <Row className="text-center mt-2 mb-3">
          <Col>
            <h5
              className={css`
                @media (max-width: 761px) {
                  margin-bottom: 0;
                }
              `}
            >
              Normal
            </h5>
            {abilities.normal.map((ability, index) => (
              <div
                className={`${css`
                  font-size: 1.5rem;
                  font-weight: 600;
                  line-height: 1.2;

                  @media (max-width: 768px) {
                    font-size: 1.25rem;
                  }
                `} text-white mb-1`}
                key={index}
              >
                {ability}
              </div>
            ))}
            {abilities.normal.length === 0 && (
              <div className="display-4 text-white">-</div>
            )}
          </Col>
          <Col>
            <h5
              className={css`
                @media (max-width: 761px) {
                  margin-bottom: 0;
                }
              `}
            >
              Hidden
            </h5>
            {abilities.hidden.map((ability, index) => (
              <div
                key={index}
                className={`${css`
                  font-size: 1.5rem;
                  font-weight: 600;
                  line-height: 1.2;

                  @media (max-width: 768px) {
                    font-size: 1.25rem;
                  }
                `} text-white mb-1`}
              >
                {ability}
              </div>
            ))}
            {abilities.hidden.length === 0 && (
              <div className="display-4 text-white">-</div>
            )}
          </Col>
        </Row>
      </>
    );
  };

  const renderEvolutionLine = (pokemonName: string) => {
    return (
      <>
        <Row className="mt-2 mt-md-3">
          <h4 className="m-auto">Evolution Line</h4>
        </Row>
        <Row className="text-center mt-3">
          {family.evolutionLine.length === 1 ? (
            <div className="h4 text-white mt-1" style={{ margin: "0 auto" }}>
              This Pokémon has no evolution line
            </div>
          ) : (
            family.evolutionLine.map(({ name, number: i, sprite }, index) => (
              <Col
                onClick={() => pokemonName !== name && changePokemon(i)}
                style={{ cursor: "pointer" }}
                key={index}
              >
                <img width="60" src={sprite} alt={name} />
                <h6 className="mt-3 mb-0 text-white">{name}</h6>
              </Col>
            ))
          )}
        </Row>
      </>
    );
  };

  return (
    <Col md="12" lg="4" className="d-flex flex-column justify-content-center">
      {renderTypes()}
      {renderHeightWeight()}
      {renderAbilities()}
      {renderEvolutionLine(name)}
    </Col>
  );
};

const mapStateToProps = (state: any) => {
  const { pokemons, currentPokemon, currentForm } = state.pokemon;

  return {
    name: pokemons[currentPokemon][currentForm].name,
    types: pokemons[currentPokemon][currentForm].types,
    height: pokemons[currentPokemon][currentForm].height,
    weight: pokemons[currentPokemon][currentForm].weight,
    abilities: pokemons[currentPokemon][currentForm].abilities,
    family: pokemons[currentPokemon][currentForm].family
  };
};

export default connect(
  mapStateToProps,
  { changePokemon }
)(Description);