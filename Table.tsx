import { faker } from "@faker-js/faker";
import { Card, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";

interface dataItems {
  key: string;
  image: string;
  text: string;
  startDate: string;
  endDate: string;
  spendMoney: string;
  totalAmount: string;
}

const TableBalance = () => {
  const { t } = useTranslation();

  const colmns: ColumnsType<dataItems> = [
    {
      width: "30%",
      key: "title",
      render: (text: string, record: dataItems) => (
        <div className="flex items-center gap-8 ">
          <img
            src={record.image}
            alt="banner"
            width={80}
            className="rounded-[8px]"
          />
          <div>
            <h6 className="font-[500]">Title</h6>
            <p className="text-textColor text-[14px] font-[300] mt-1">
              {record.text}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "date",
      width: "15%",
      render: (text: string, record: dataItems) => (
        <div className="flex items-center gap-8 ">
          <div>
            <h6 className="font-[500]">End Date</h6>
            <p className="text-textColor text-[14px] font-[300] mt-1">
              {record.startDate}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "date",
      width: "15%",
      render: (text: string, record: dataItems) => (
        <div className="flex items-center gap-8 ">
          <div>
            <h6 className="font-[500]">Start Date</h6>
            <p className="text-textColor text-[14px] font-[300] mt-1">
              {record.endDate}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "date",
      width: "15%",
      render: (text: string, record: dataItems) => (
        <div className="flex items-center gap-8 ">
          <div>
            <h6 className="font-[500]">Spend Money</h6>
            <p className="text-textColor text-[14px] font-[300] mt-1">
              ${record.spendMoney}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "date",
      width: "15%",
      render: (text: string, record: dataItems) => (
        <div className="flex items-center gap-8 ">
          <div>
            <h6 className="font-[500]">Spend Money</h6>
            <p className="text-primary text-[14px] font-[600] mt-1">
              -${record.totalAmount}
            </p>
          </div>
        </div>
      ),
    },
  ];

  const randomData = (count: number): dataItems[] => {
    const data: dataItems[] = [];
    for (let i = 0; i < count; i++) {
      data.push({
        key: i.toString(),
        image: faker.image.url(),
        text: faker.person.jobTitle(),
        startDate: faker.date.future().toLocaleDateString("en-Uk", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        endDate: faker.date.future().toLocaleDateString("en-Uk", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }),
        spendMoney: faker.finance.amount(),
        totalAmount: faker.finance.amount(),
      });
    }
    return data;
  };

  const data = randomData(3);

  return (
    <Card style={{ marginTop: 20, borderRadius: "10px" }}>
      <h5 className="font-[600]">{t("transactionHistroy")}</h5>
      <Table
        style={{ marginTop: 20 }}
        pagination={false}
        showHeader={false}
        columns={colmns}
        dataSource={data}
      ></Table>
    </Card>
  );
};

export default TableBalance;
