import { RiDeleteBin6Line } from "react-icons/ri";
import { Field, FieldType } from "./types";
import { createField } from "./utils";
import { IoMdAddCircleOutline } from "react-icons/io";

type FieldProps = {
    fields: Field[];
    onChange: (fields: Field[]) => void;
};

export default function FieldBuilder({ fields, onChange }: FieldProps) {

    const updateField = (index: number, updated: Partial<Field>) => {
        const newFields = [...fields];
        newFields[index] = { ...newFields[index], ...updated };

        // if type changed to object, ensure children
        if (updated.type === "object") {
            newFields[index].children = newFields[index].children || [];
        }

        onChange(newFields);
    };

    const addField = () => {
        onChange([...fields, createField()]);
    };

    const deleteField = (index: number) => {
        const newFields = fields.filter((_, i) => i !== index);
        onChange(newFields);
    };

    return (
        <div className=" flex flex-col  items-start justify-between">
            {fields.map((field, index) => (
                <div key={field.id} className=" flex gap-2 mb-2 border-2 p-2 ml-2">
                    <input
                        className="border-2 rounded-sm p-2"
                        placeholder="key"
                        value={field.key}
                        onChange={(e) =>
                            updateField(index, { key: e.target.value })
                        }
                    />

                    <select
                        className="border-2 rounded-sm p-2"
                        value={field.type}
                        onChange={(e) =>
                            updateField(index, {
                                type: e.target.value as FieldType,
                            })
                        }
                    >
                        <option value="string">string</option>
                        <option value="number">number</option>
                        <option value="boolean">boolean</option>
                        <option value="object">object</option>
                    </select>

                    {field.type !== "object" && (
                        <input
                            className="border-2 rounded-sm p-2"
                            placeholder="value"
                            value={field.value}
                            onChange={(e) =>
                                updateField(index, { value: e.target.value })
                            }
                        />
                    )}

                    <button
                        onClick={() => deleteField(index)}
                        className="ml-5"
                    >
                        <RiDeleteBin6Line />
                    </button>

                    {/* Recursive render */}
                    {field.type === "object" && (
                        <FieldBuilder
                            fields={field.children || []}
                            onChange={(childFields) =>
                                updateField(index, { children: childFields })
                            }
                        />
                    )}
                </div>
            ))}
            <button onClick={addField} className="ml-4 flex items-center gap-2 mt-4 border-2 p-2 rounded-md bg-blue-400">
                <IoMdAddCircleOutline /> Add Field
            </button>

        </div>
    );
}