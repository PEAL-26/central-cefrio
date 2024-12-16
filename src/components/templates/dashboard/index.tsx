'use client';
import { getDashboardData } from '@/services/dashboard';
import { ResponsiveLine } from '@nivo/line';
import { useQuery } from '@tanstack/react-query';
import { Loader2Icon, PackageIcon, ReceiptIcon, UsersIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

export function Dashboard() {
  const { data, isFetching } = useQuery({
    queryFn: ({ signal }) => getDashboardData({ signal }),
    queryKey: ['dashboard'],
  });

  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Invoices</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-4xl font-bold">{data?.invoices || 'S/N'}</div>
          <ReceiptIcon className="h-10 w-10 text-primary" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Clients</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-4xl font-bold">{data?.customers || 'S/N'}</div>
          <UsersIcon className="h-10 w-10 text-primary" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Products/Services</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-4xl font-bold">{data?.products || 'S/N'}</div>
          <PackageIcon className="h-10 w-10 text-primary" />
        </CardContent>
      </Card>
      <Card className="col-span-1 lg:col-span-2 xl:col-span-3">
        <CardHeader>
          <CardTitle>Facturação nos últimos 6 meses</CardTitle>
        </CardHeader>
        <CardContent>
          {isFetching && (
            <div className="flex aspect-[9/4] items-center justify-center">
              <Loader2Icon className="size-5 animate-spin text-primary" />
            </div>
          )}
          {!isFetching && data?.monthlyInvoices && data?.monthlyInvoices?.length === 0 && (
            <div className="flex aspect-[9/4] items-center justify-center">
              <span>Nenhum informação</span>
            </div>
          )}
          {!isFetching && data?.monthlyInvoices && data?.monthlyInvoices?.length > 0 && (
            <LineChart className="aspect-[9/4]" data={data.monthlyInvoices} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function LineChart(props: any) {
  const { data, ...rest } = props;
  return (
    <div {...rest}>
      <ResponsiveLine
        data={data}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: 'point',
        }}
        yScale={{
          type: 'linear',
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={['#2563eb', '#e11d48']}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: '9999px',
            },
            container: {
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '6px',
            },
          },
          grid: {
            line: {
              stroke: '#f3f4f6',
            },
          },
        }}
        role="application"
      />
      <div className="mt-4 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2 text-xs">
          <div className="h-2 w-4 bg-[#2563eb]" /> Facturação
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="h-2 w-4 bg-[#e11d48]" />
          Pagamentos
        </div>
      </div>
    </div>
  );
}
