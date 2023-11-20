import { useDeleteAdsMutation } from "@/redux/api/dashBoardApi";
import { useGetAdsTableDataQuery } from "@/redux/api/dashBoardApi";
import { AdvertisementDetailType } from "@/redux/api/types/advertisement.type";
import { errorMessage } from "@/utils";
import { Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  isModalDelete: boolean;
  setIsModalDelete: (isModalDelete: boolean) => void;
  idDelete: any;
  refetch: () => void;
}

const ModalDelete = ({
  isModalDelete,
  setIsModalDelete,
  idDelete,
  refetch,
}: Props) => {
  const { t } = useTranslation();

  const [deleteAds, { isSuccess, isError, isLoading, error }] =
    useDeleteAdsMutation();

  const { data, isFetching } = useGetAdsTableDataQuery({
    refetchOnMountOrArgChange: true,
  });

  const onClose = () => {
    setIsModalDelete(false);
  };
  function handleDeleteAds(id: any) {
    deleteAds(id);
    onClose();
    refetch();
  }
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (isSuccess) {
      api.success({
        placement: "topRight",
        message: "Delete Successfully",
      });
    }
    if (isError) {
      api.error({
        placement: "topRight",
        message: errorMessage(error),
      });
    }
  }, [isLoading]);

  return (
    <>
      {contextHolder}
      <Modal
        onCancel={onClose}
        open={isModalDelete}
        footer={null}
        closeIcon={false}
      >
        <h4 className="uppercase">{t("deleteAds")}</h4>
        <p className="text-[16px] mt-2">{t("wanttoDelete")}</p>
        {isFetching ? (
          <div>Loading.....!</div>
        ) : (
          <div>
            {data &&
              data.data
                .filter(
                  (items: AdvertisementDetailType | any) =>
                    items._id == idDelete
                )
                .map((item: AdvertisementDetailType) => (
                  <div key={item._id}>
                    <div className="flex items-center justify-center">
                      <img
                        className="w-[60px] aspect-square object-cover rounded-[4.65px]"
                        src={item.thumbnail}
                        alt=""
                      />
                    </div>
                  </div>
                ))}
          </div>
        )}
        <div className="flex items-center justify-end gap-2 mt-16">
          <button
            onClick={onClose}
            className="text-info bg-bgInfo font-[500]  px-4 py-2 rounded-[10px]"
          >
            Cancel
          </button>
          <button
            className="text-primary bg-bgPrimary font-[500] px-4 py-2 rounded-[10px]"
            onClick={() => handleDeleteAds(idDelete)}
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ModalDelete;
