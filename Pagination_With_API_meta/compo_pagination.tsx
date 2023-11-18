import { AdvertisementApi } from "@/service/api/advertisement.api";

const [advertisement, setAdvertisement] = useState<AdvertisementType[]>([]);
const [query, setQuery] = useState(initquery);
const [pagination, setPagination] = useState<Partial<Meta>>({
  currentPage: 1,
  totalItems: 0,
  itemsPerPage: 10,
});

const compo_pagination = async () => {
  setLoading(true);
  const typeAds = ["image", "video", "app"];
  const type = key == "all" ? null : key;
  const { meta, data, isSuccess, message } =
    await AdvertisementApi.getAdvertisement({
      ...query,
    });
  if (isSuccess) {
    setAdvertisement(data);
    setPagination(meta);
    setLoading(false);
  } else {
    console.log("message", message);
    setLoading(false);
  }
};

useEffect(() => {
  getAdvertisement();
}, [query]);

return (
  <div>
    <Table<AdvertisementType>
      dataSource={advertisement}
      columns={columns}
      loading={loading}
      scroll={{ x: "true" }}
      pagination={false}
    ></Table>
  </div>
);

export default compo_pagination;
