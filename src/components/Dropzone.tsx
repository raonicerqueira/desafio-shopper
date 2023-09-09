"use client";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Table from "./Table";

type ProductToUpdate = {
  product_code: string;
  product_name: string | undefined;
  product_actual_price: string | undefined;
  new_price: string;
  validation: {
    empty_fields?: boolean;
    invalid_product_code?: boolean;
    invalid_product_price?: boolean;
    price_below_cost?: boolean;
    overvalued_new_price?: boolean;
  };
};

function Dropzone({ className }) {
  const [csvFile, setCsvFile] = useState<File[]>();
  const [validation, setValidation] = useState<ProductToUpdate[]>();
  const [validButton, setvalidButton] = useState(false);
  const [updateButton, setupdateButton] = useState(false);
  const [validProducts, setValidProducts] = useState<ProductToUpdate[]>();

  const [message, setMessage] = useState("");

  function uploadFile(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (csvFile) {
      setMessage(
        "Arquivo carregado com sucesso, por favor valide os dados. A atualização só poderá ser feita se TODOS os dados estiverem corretos"
      );
      const formData = new FormData();
      formData.append("csvFile", csvFile[0]);

      try {
        axios
          .post("http://localhost:3030/products", formData)
          .then((response) => {
            setValidation(response.data);
            verifyValidationFile(response.data);
          });
      } catch (error) {}
    }
  }

  function updateProductPrices() {
    const url = "http://localhost:3030/updatePrices";

    axios
      .put(url, { validProducts: validProducts })
      .then((response) => {
        setMessage("Preços atualizados com sucesso!");
      })
      .catch((error) => {});
  }

  function verifyValidationFile(validation: ProductToUpdate[]) {
    const isCsvValid = validation.some((product: ProductToUpdate) => {
      return (
        product.validation.empty_fields ||
        product.validation.invalid_product_code ||
        product.validation.invalid_product_price ||
        product.validation.overvalued_new_price ||
        product.validation.price_below_cost
      );
    });

    if (!isCsvValid) {
      setValidProducts(validation);
      setupdateButton(true);
    }
  }

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length) {
      setCsvFile(acceptedFiles);
      setvalidButton(true);
      setupdateButton(false);
    } else {
      setvalidButton(false);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    maxFiles: 1,
  });

  return (
    <section>
      <div>
        <div {...getRootProps({ className: className })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="my-auto">Arraste o arquivo até aqui ...</p>
          ) : (
            <div className="flex flex-col gap-10">
              <p className="my-auto">
                Arraste seu arquivo de atualização aqui, ou clique para
                seleciona-lo
              </p>
              <span className="text-xs mt-4">
                somente arquivos .csv são suportados
              </span>
            </div>
          )}
        </div>
      </div>

      {validation && <Table validation={validation} />}

      <p className="text-gray-50 h-1 text-sm mt-10 z-10">{message}</p>

      <div className="flex mt-20 justify-around">
        <button
          className={
            validButton
              ? "bg-green-700 hover:bg-green-600 rounded-lg p-3"
              : "bg-gray-200 text-gray-300 rounded-lg p-3 disabled:opacity-100"
          }
          onClick={uploadFile}
        >
          Validar
        </button>
        <button
          className={
            updateButton
              ? "bg-yellow-700 hover:bg-yellow-600 rounded-lg p-3"
              : "bg-gray-200 text-gray-300 rounded-lg p-3 disabled:opacity-100"
          }
          onClick={updateProductPrices}
        >
          Atualizar
        </button>
      </div>
    </section>
  );
}

export default Dropzone;
