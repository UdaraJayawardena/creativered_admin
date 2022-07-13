export class RefundRequest {
  refDate: string;
  refTime: string;
  reason: string;
  status: string;
  id: number;
  refundOrderId: number;

  constructor(refDate: string, refTime: string, reason: string, status: string, id: number, refundOrderId: number) {
    this.refDate = refDate;
    this.refTime = refTime;
    this.reason = reason;
    this.status = status;
    this.id = id;
    this.refundOrderId = refundOrderId;
  }
}
